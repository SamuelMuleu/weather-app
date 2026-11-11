import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, LocateFixed, MapPin, Search } from "lucide-react";
import { Location, reverseGeocode, searchLocations, weatherPath } from "@/lib/weatherApi";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

const label = (l: Location) => [l.name, l.state, l.country].filter(Boolean).join(", ");

export default function SearchBox({ autoFocus = false, className }: { autoFocus?: boolean; className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const navigate = useNavigate();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  // Debounced search; aborts the previous request so results never arrive out of order
  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("loading");
      try {
        const found = await searchLocations(term, controller.signal);
        setResults(found);
        setActive(found.length ? 0 : -1);
        setStatus("done");
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setStatus("error");
        }
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Close the list when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const select = (location: Location) => {
    setOpen(false);
    setQuery("");
    navigate(weatherPath(location));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || !results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      select(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Seu navegador não permite obter a localização.");
      return;
    }
    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const place = await reverseGeocode(coords.latitude, coords.longitude);
          navigate(weatherPath({ lat: coords.latitude, lon: coords.longitude, name: place?.name ?? "Minha localização" }));
        } catch {
          navigate(weatherPath({ lat: coords.latitude, lon: coords.longitude, name: "Minha localização" }));
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setGeoError("Não foi possível acessar sua localização. Verifique a permissão do navegador.");
      },
      { timeout: 10000 }
    );
  };

  const showList = open && query.trim().length >= 2 && status !== "idle";

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" aria-hidden />
          <input
            type="search"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
            aria-label="Buscar cidade"
            placeholder="Buscar cidade"
            autoFocus={autoFocus}
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="h-14 w-full rounded-xl border-2 border-transparent bg-bg_input pl-12 pr-12 text-base text-gray-100 placeholder:text-gray-400 outline-none transition-colors focus:border-blue_base"
          />
          {status === "loading" && (
            <LoaderCircle className="absolute right-4 top-1/2 size-5 -translate-y-1/2 animate-spin text-blue_base" aria-label="Buscando" />
          )}
        </div>
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          title="Usar minha localização"
          aria-label="Usar minha localização"
          className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-bg_input text-gray-200 transition-colors hover:text-blue_base focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue_base disabled:opacity-60"
        >
          {locating ? <LoaderCircle className="size-5 animate-spin" /> : <LocateFixed className="size-5" />}
        </button>
      </div>

      {geoError && <p className="mt-2 text-sm text-red-300">{geoError}</p>}

      <AnimatePresence>
        {showList && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-xl border border-white/5 bg-[#22222F] py-1 shadow-2xl shadow-black/50"
          >
            {status === "error" && <li className="px-4 py-3 text-sm text-red-300">Não foi possível buscar agora. Tente novamente.</li>}
            {status === "done" && results.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">
                Nenhuma cidade encontrada para “{query.trim()}”. Tente digitar o nome completo, como “Campos dos Goytacazes”.
              </li>
            )}
            {results.map((location, i) => (
              <li
                key={`${location.lat},${location.lon}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(location)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-200",
                  i === active && "bg-white/5 text-white"
                )}
              >
                <MapPin className="size-4 shrink-0 text-blue_base" aria-hidden />
                {label(location)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
