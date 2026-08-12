"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ChevronLeft,
  ChevronRight,
  FolderTree,
  Plus,
  Search,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { CategoryForm } from "./CategoryForm";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};

type CategoryManagerProps = {
  initialCategories: Category[];
};

const CATEGORIES_PER_PAGE = 6;

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

export function CategoryManager({
  initialCategories,
}: CategoryManagerProps) {
  const [categories, setCategories] =
    useState(initialCategories);

  const [search, setSearch] =
    useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  /*
   * Create category
   */
  function handleCreate(
    category: Category,
  ) {
    setCategories(
      (previous) => [
        category,
        ...previous,
      ],
    );

    setCurrentPage(1);
  }

  /*
   * Delete category
   */
  function handleDelete(
    categoryId: string,
  ) {
    setCategories(
      (previous) =>
        previous.filter(
          (category) =>
            category.id !==
            categoryId,
        ),
    );

    setCurrentPage(1);
  }

  /*
   * Search/filter
   */
  const filteredCategories =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      if (!normalizedSearch) {
        return categories;
      }

      return categories.filter(
        (category) => {
          const name =
            category.name
              .toLowerCase();

          const description =
            category.description
              ?.toLowerCase() ||
            "";

          return (
            name.includes(
              normalizedSearch,
            ) ||
            description.includes(
              normalizedSearch,
            )
          );
        },
      );
    }, [categories, search]);

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCategories.length /
        CATEGORIES_PER_PAGE,
    ),
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    CATEGORIES_PER_PAGE;

  const paginatedCategories =
    filteredCategories.slice(
      startIndex,
      startIndex +
        CATEGORIES_PER_PAGE,
    );

  const hasSearch =
    search.trim().length > 0;

  function handleSearchChange(
    value: string,
  ) {
    setSearch(value);
    setCurrentPage(1);
  }

  function clearSearch() {
    setSearch("");
    setCurrentPage(1);
  }

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section className="rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8">
        <Badge variant="secondary">
          <FolderTree className="size-3.5" />
          Category Management
        </Badge>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Manage Categories
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Create, search and
          manage equipment
          categories.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* Create category */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="size-5" />
              Add Category
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CategoryForm
              onSuccess={
                handleCreate
              }
            />
          </CardContent>
        </Card>

        {/* Category management */}
        <div className="space-y-5">
          {/* Search */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>
                Search Categories
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <label
                    htmlFor="category-search"
                    className="sr-only"
                  >
                    Search categories
                  </label>

                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="category-search"
                    value={search}
                    onChange={(
                      event,
                    ) =>
                      handleSearchChange(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Search by name or description"
                    className="pl-9"
                  />
                </div>

                {hasSearch && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={
                      clearSearch
                    }
                  >
                    <X className="size-4" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories table */}
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>
                  All Categories
                </CardTitle>

                <Badge variant="secondary">
                  {
                    filteredCategories.length
                  }{" "}
                  {filteredCategories.length ===
                  1
                    ? "result"
                    : "results"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {paginatedCategories.length ===
              0 ? (
                /* Empty state */
                <div className="py-16 text-center">
                  <FolderTree className="mx-auto size-12 text-muted-foreground" />

                  <p className="mt-4 font-semibold">
                    {hasSearch
                      ? "No matching categories found"
                      : "No categories found"}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {hasSearch
                      ? "Try changing your search text."
                      : "Create your first equipment category."}
                  </p>

                  {hasSearch && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-5"
                      onClick={
                        clearSearch
                      }
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">
                        Category
                      </TableHead>

                      <TableHead className="min-w-[260px]">
                        Description
                      </TableHead>

                      <TableHead className="min-w-[130px]">
                        Created
                      </TableHead>

                      <TableHead className="text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {paginatedCategories.map(
                      (category) => (
                        <TableRow
                          key={
                            category.id
                          }
                        >
                          {/* Category name */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FolderTree className="size-4" />
                              </div>

                              <span className="font-medium">
                                {
                                  category.name
                                }
                              </span>
                            </div>
                          </TableCell>

                          {/* Description */}
                          <TableCell>
                            <p className="max-w-[350px] truncate text-sm text-muted-foreground">
                              {category.description ||
                                "No description"}
                            </p>
                          </TableCell>

                          {/* Created date */}
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(
                              category.createdAt,
                            )}
                          </TableCell>

                          {/* Action */}
                          <TableCell className="text-right">
                            <div className="flex justify-end">
                              <DeleteCategoryButton
                                categoryId={
                                  category.id
                                }
                                onSuccess={
                                  handleDelete
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {filteredCategories.length >
            0 &&
            totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {startIndex + 1}–
                  {Math.min(
                    startIndex +
                      CATEGORIES_PER_PAGE,
                    filteredCategories.length,
                  )}{" "}
                  of{" "}
                  {
                    filteredCategories.length
                  }{" "}
                  categories
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={
                      safeCurrentPage ===
                      1
                    }
                    onClick={() =>
                      setCurrentPage(
                        safeCurrentPage -
                          1,
                      )
                    }
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>

                  <Badge variant="outline">
                    Page{" "}
                    {
                      safeCurrentPage
                    }{" "}
                    of {totalPages}
                  </Badge>

                  {/* Next */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={
                      safeCurrentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        safeCurrentPage +
                          1,
                      )
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
        </div>
      </section>
    </div>
  );
}