// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import type { Category } from "@/types/category";
// import { RotateCcw, Search } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { FormEvent, useState } from "react";

// type GearFiltersProps = {
//   categories: Category[];
// };

// export function GearFilters({
//   categories,
// }: GearFiltersProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [searchTerm, setSearchTerm] = useState(
//     searchParams.get("searchTerm") || "",
//   );

//   const [category, setCategory] = useState(
//     searchParams.get("category") || "all",
//   );

//   const [sort, setSort] = useState(
//     `${searchParams.get("sortBy") || "createdAt"}-${
//       searchParams.get("sortOrder") || "desc"
//     }`,
//   );

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const params = new URLSearchParams(searchParams.toString());

//     if (searchTerm.trim()) {
//       params.set("searchTerm", searchTerm.trim());
//     } else {
//       params.delete("searchTerm");
//     }

//     if (category !== "all") {
//       params.set("category", category);
//     } else {
//       params.delete("category");
//     }

//     const [sortBy, sortOrder] = sort.split("-");

//     params.set("sortBy", sortBy);
//     params.set("sortOrder", sortOrder);
//     params.set("page", "1");

//     router.push(`/gear?${params.toString()}`);
//   }

//   function handleReset() {
//     setSearchTerm("");
//     setCategory("all");
//     setSort("createdAt-desc");

//     router.push("/gear");
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mt-10 rounded-2xl border bg-card p-4 shadow-sm sm:p-5"
//     >
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//           <Input
//             value={searchTerm}
//             onChange={(event) =>
//               setSearchTerm(event.target.value)
//             }
//             placeholder="Search by name, brand, or description"
//             className="pl-9"
//           />
//         </div>

//         <Select
//           value={category}
//           onValueChange={setCategory}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select category" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="all">
//               All categories
//             </SelectItem>

//             {categories.map((item) => (
//               <SelectItem
//                 key={item.id}
//                 value={item.id}
//               >
//                 {item.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select
//           value={sort}
//           onValueChange={setSort}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Sort gear" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="createdAt-desc">
//               Newest first
//             </SelectItem>

//             <SelectItem value="pricePerDay-asc">
//               Price: low to high
//             </SelectItem>

//             <SelectItem value="pricePerDay-desc">
//               Price: high to low
//             </SelectItem>

//             <SelectItem value="name-asc">
//               Name: A to Z
//             </SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button type="submit" className="flex-1">
//             <Search className="size-4" />
//             Apply
//           </Button>

//           <Button
//             type="button"
//             variant="outline"
//             size="icon"
//             onClick={handleReset}
//             aria-label="Reset filters"
//           >
//             <RotateCcw className="size-4" />
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types/category";
import { RotateCcw, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type GearFiltersProps = {
  categories: Category[];
};

export function GearFilters({
  categories,
}: GearFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || "",
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || "",
  );

  const [sort, setSort] = useState(
    `${searchParams.get("sortBy") || "createdAt"}-${
      searchParams.get("sortOrder") || "desc"
    }`,
  );

  const [priceError, setPriceError] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const minimumPrice = minPrice
      ? Number(minPrice)
      : null;

    const maximumPrice = maxPrice
      ? Number(maxPrice)
      : null;

    if (
      minimumPrice !== null &&
      minimumPrice < 0
    ) {
      setPriceError(
        "Minimum price cannot be negative.",
      );
      return;
    }

    if (
      maximumPrice !== null &&
      maximumPrice < 0
    ) {
      setPriceError(
        "Maximum price cannot be negative.",
      );
      return;
    }

    if (
      minimumPrice !== null &&
      maximumPrice !== null &&
      minimumPrice > maximumPrice
    ) {
      setPriceError(
        "Minimum price cannot be greater than maximum price.",
      );
      return;
    }

    setPriceError("");

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    // Search
    if (searchTerm.trim()) {
      params.set(
        "searchTerm",
        searchTerm.trim(),
      );
    } else {
      params.delete("searchTerm");
    }

    // Category
    if (category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    // Minimum price
    if (minPrice.trim()) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    // Maximum price
    if (maxPrice.trim()) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Sorting
    const [sortBy, sortOrder] =
      sort.split("-");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    // Always return to page 1
    params.set("page", "1");

    router.push(
      `/gear?${params.toString()}`,
    );
  }

  function handleReset() {
    setSearchTerm("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("createdAt-desc");
    setPriceError("");

    router.push("/gear");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.75fr_0.75fr_1fr_auto]">
        {/* Search */}
        <div className="space-y-2">
          <label
            htmlFor="gear-search"
            className="text-sm font-medium"
          >
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="gear-search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value,
                )
              }
              placeholder="Name or brand"
              className="pl-9"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label
            htmlFor="gear-category"
            className="text-sm font-medium"
          >
            Category
          </label>

          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger
              id="gear-category"
              className="w-full"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All categories
              </SelectItem>

              {categories.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minimum price */}
        <div className="space-y-2">
          <label
            htmlFor="min-price"
            className="text-sm font-medium"
          >
            Min Price
          </label>

          <Input
            id="min-price"
            type="number"
            min="0"
            step="1"
            value={minPrice}
            onChange={(event) => {
              setMinPrice(
                event.target.value,
              );
              setPriceError("");
            }}
            placeholder="৳ Min"
          />
        </div>

        {/* Maximum price */}
        <div className="space-y-2">
          <label
            htmlFor="max-price"
            className="text-sm font-medium"
          >
            Max Price
          </label>

          <Input
            id="max-price"
            type="number"
            min="0"
            step="1"
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(
                event.target.value,
              );
              setPriceError("");
            }}
            placeholder="৳ Max"
          />
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label
            htmlFor="gear-sort"
            className="text-sm font-medium"
          >
            Sort By
          </label>

          <Select
            value={sort}
            onValueChange={setSort}
          >
            <SelectTrigger
              id="gear-sort"
              className="w-full"
            >
              <SelectValue placeholder="Sort gear" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="createdAt-desc">
                Newest first
              </SelectItem>

              <SelectItem value="pricePerDay-asc">
                Price: low to high
              </SelectItem>

              <SelectItem value="pricePerDay-desc">
                Price: high to low
              </SelectItem>

              <SelectItem value="name-asc">
                Name: A to Z
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">
          <Button
            type="submit"
            className="flex-1"
          >
            <Search className="size-4" />
            Apply
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleReset}
            aria-label="Reset filters"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>

      {/* Price validation */}
      {priceError && (
        <p className="mt-3 text-sm text-destructive">
          {priceError}
        </p>
      )}
    </form>
  );
}