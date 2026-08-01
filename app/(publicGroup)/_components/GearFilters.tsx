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

  const [sort, setSort] = useState(
    `${searchParams.get("sortBy") || "createdAt"}-${
      searchParams.get("sortOrder") || "desc"
    }`,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    } else {
      params.delete("searchTerm");
    }

    if (category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    const [sortBy, sortOrder] = sort.split("-");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    router.push(`/gear?${params.toString()}`);
  }

  function handleReset() {
    setSearchTerm("");
    setCategory("all");
    setSort("createdAt-desc");

    router.push("/gear");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search by name, brand, or description"
            className="pl-9"
          />
        </div>

        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
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

        <Select
          value={sort}
          onValueChange={setSort}
        >
          <SelectTrigger className="w-full">
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

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
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
    </form>
  );
}