"use client";

import React, { useState, useMemo } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FunnelIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SearchIcon,
  CalendarIcon,
  CheckIcon,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { documentList, DocumentListItem } from "../../_data/document-list";

type SortField =
  | "id"
  | "documentTitle"
  | "documentDescription"
  | "requestorName"
  | "buFu"
  | "extension"
  | "submitDate"
  | "approvalDate"
  | "urgency"
  | "documentType"
  | "documentNumber"
  | "documentStatus"
  | "documentStage";
type SortDirection = "asc" | "desc" | null;

type FilterState = {
  documentTitle: string;
  requestorName: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  documentStatus: string;
  documentType: string;
  urgency: string;
};

export default function ApprovedDocumentTable() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [documentTitleFilter, setDocumentTitleFilter] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    documentTitle: "",
    requestorName: "",
    startDate: new Date(),
    endDate: new Date(),
    documentStatus: "",
    documentType: "",
    urgency: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    documentTitle: "",
    requestorName: "",
    startDate: undefined,
    endDate: undefined,
    documentStatus: "",
    documentType: "",
    urgency: "",
  });
  const itemsPerPage = 10;

  // Get unique values for filter options
  const uniqueRequestorNames = useMemo(() => {
    return Array.from(
      new Set(documentList.map((doc) => doc.requestorName))
    ).sort();
  }, []);

  const uniqueDocumentTypes = useMemo(() => {
    return Array.from(
      new Set(documentList.map((doc) => doc.documentType))
    ).sort();
  }, []);

  const uniqueUrgencies = useMemo(() => {
    return Array.from(new Set(documentList.map((doc) => doc.urgency))).sort();
  }, []);

  const filteredDocuments = useMemo<DocumentListItem[]>(() => {
    let filtered = documentList;

    // Filter by document title or document number (from input)
    if (documentTitleFilter.trim()) {
      const searchTerm = documentTitleFilter.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.documentTitle.toLowerCase().includes(searchTerm) ||
          doc.documentNumber.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by requestor name
    if (appliedFilters.requestorName) {
      filtered = filtered.filter(
        (doc) => doc.requestorName === appliedFilters.requestorName
      );
    }

    // Filter by submit date range
    if (appliedFilters.startDate || appliedFilters.endDate) {
      filtered = filtered.filter((doc) => {
        if (!doc.submitDate) return false;
        const docDate = new Date(doc.submitDate);
        docDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
        
        if (appliedFilters.startDate && appliedFilters.endDate) {
          // Both dates selected - filter between start and end
          const startDate = new Date(appliedFilters.startDate);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(appliedFilters.endDate);
          endDate.setHours(23, 59, 59, 999);
          return docDate >= startDate && docDate <= endDate;
        } else if (appliedFilters.startDate) {
          // Only start date selected - filter from start date onwards
          const startDate = new Date(appliedFilters.startDate);
          startDate.setHours(0, 0, 0, 0);
          return docDate >= startDate;
        } else if (appliedFilters.endDate) {
          // Only end date selected - filter up to end date
          const endDate = new Date(appliedFilters.endDate);
          endDate.setHours(23, 59, 59, 999);
          return docDate <= endDate;
        }
        return true;
      });
    }

    // Filter by document status
    if (appliedFilters.documentStatus) {
      filtered = filtered.filter(
        (doc) => doc.documentStatus === appliedFilters.documentStatus
      );
    }

    // Filter by document type
    if (appliedFilters.documentType) {
      filtered = filtered.filter(
        (doc) => doc.documentType === appliedFilters.documentType
      );
    }

    // Filter by urgency
    if (appliedFilters.urgency) {
      filtered = filtered.filter(
        (doc) => doc.urgency === appliedFilters.urgency
      );
    }

    return filtered;
  }, [documentTitleFilter, appliedFilters]);

  // Sort documents
  const sortedDocuments = useMemo(() => {
    if (!sortField || !sortDirection) {
      return filteredDocuments;
    }

    return [...filteredDocuments].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      if (sortField === "id") {
        aValue = a.id;
        bValue = b.id;
      } else if (sortField === "documentTitle") {
        aValue = a.documentTitle.toLowerCase();
        bValue = b.documentTitle.toLowerCase();
      } else if (sortField === "documentDescription") {
        aValue = a.documentDescription.toLowerCase();
        bValue = b.documentDescription.toLowerCase();
      } else if (sortField === "requestorName") {
        aValue = a.requestorName.toLowerCase();
        bValue = b.requestorName.toLowerCase();
      } else if (sortField === "buFu") {
        aValue = a.buFu.toLowerCase();
        bValue = b.buFu.toLowerCase();
      } else if (sortField === "extension") {
        aValue = a.extension.toLowerCase();
        bValue = b.extension.toLowerCase();
      } else if (sortField === "submitDate") {
        aValue = a.submitDate || new Date(0);
        bValue = b.submitDate || new Date(0);
      } else if (sortField === "approvalDate") {
        aValue = a.approvalDate || new Date(0);
        bValue = b.approvalDate || new Date(0);
      } else if (sortField === "urgency") {
        aValue = a.urgency.toLowerCase();
        bValue = b.urgency.toLowerCase();
      } else if (sortField === "documentType") {
        aValue = a.documentType.toLowerCase();
        bValue = b.documentType.toLowerCase();
      } else if (sortField === "documentNumber") {
        aValue = a.documentNumber.toLowerCase();
        bValue = b.documentNumber.toLowerCase();
      } else if (sortField === "documentStatus") {
        aValue = (a.documentStatus || "").toLowerCase();
        bValue = (b.documentStatus || "").toLowerCase();
      } else if (sortField === "documentStage") {
        aValue = (a.documentStage || "").toLowerCase();
        bValue = (b.documentStage || "").toLowerCase();
      } else {
        aValue = a.documentDescription.toLowerCase();
        bValue = b.documentDescription.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredDocuments, sortField, sortDirection]);

  // Paginate documents
  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedDocuments.slice(startIndex, endIndex);
  }, [sortedDocuments, currentPage]);

  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="ml-2 h-4 w-4" />;
    }
    if (sortDirection === "desc") {
      return <ArrowDown className="ml-2 h-4 w-4" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const formatId = (id: number | string): string => {
    const idNumber = typeof id === "string" ? parseInt(id, 10) : id;
    return String(idNumber).padStart(9, "0");
  };

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "-";
    const dateObj = date instanceof Date ? date : new Date(date);
    return format(dateObj, "yyyy-MM-dd");
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setIsFilterSheetOpen(false);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      documentTitle: "",
      requestorName: "",
      startDate: new Date(),
      endDate: new Date(),
      documentStatus: "",
      documentType: "",
      urgency: "",
    };
    setAppliedFilters({
      documentTitle: "",
      requestorName: "",
      startDate: undefined,
      endDate: undefined,
      documentStatus: "",
      documentType: "",
      urgency: "",
    });
    setFilters(defaultFilters);
    setRequestorNameSearch("");
    setDocumentTypeSearch("");
    setUrgencySearch("");
  };

  const [requestorNameSearch, setRequestorNameSearch] = useState("");
  const filteredRequestorNames = useMemo(() => {
    if (!requestorNameSearch) return uniqueRequestorNames;
    return uniqueRequestorNames.filter((name) =>
      name.toLowerCase().includes(requestorNameSearch.toLowerCase())
    );
  }, [requestorNameSearch, uniqueRequestorNames]);

  const [documentTypeSearch, setDocumentTypeSearch] = useState("");
  const filteredDocumentTypes = useMemo(() => {
    if (!documentTypeSearch) return uniqueDocumentTypes;
    return uniqueDocumentTypes.filter((type) =>
      type.toLowerCase().includes(documentTypeSearch.toLowerCase())
    );
  }, [documentTypeSearch, uniqueDocumentTypes]);

  const [urgencySearch, setUrgencySearch] = useState("");
  const filteredUrgencies = useMemo(() => {
    if (!urgencySearch) return uniqueUrgencies;
    return uniqueUrgencies.filter((urgency) =>
      urgency.toLowerCase().includes(urgencySearch.toLowerCase())
    );
  }, [urgencySearch, uniqueUrgencies]);

  return (
    <div className="flex flex-col w-full min-h-0 max-w-full">
      <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4 shrink-0 w-full">
        <div className="flex relative w-full sm:max-w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by document title or number..."
            value={documentTitleFilter}
            onChange={(e) => {
              setDocumentTitleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button className="cursor-pointer" variant="outline">
              <FunnelIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Filter Documents</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 py-2 p-4 overflow-y-auto">
              {/* Request Name - Combobox */}
              <div className="flex flex-col gap-2">
                <Label>Request Name</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between cursor-pointer"
                    >
                      {filters.requestorName || "Select request name..."}
                      <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <div className="p-2">
                      <Input
                        placeholder="Search request name..."
                        value={requestorNameSearch}
                        onChange={(e) => setRequestorNameSearch(e.target.value)}
                        className="mb-2"
                      />
                      <div className="max-h-[200px] overflow-auto">
                        {filteredRequestorNames.length === 0 ? (
                          <div className="py-6 text-center text-sm text-muted-foreground">
                            No request name found.
                          </div>
                        ) : (
                          filteredRequestorNames.map((name) => (
                            <Button
                              key={name}
                              variant="ghost"
                              className="w-full justify-start font-normal cursor-pointer"
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  requestorName:
                                    prev.requestorName === name ? "" : name,
                                }));
                                setRequestorNameSearch("");
                              }}
                            >
                              {filters.requestorName === name && (
                                <CheckIcon className="mr-2 h-4 w-4" />
                              )}
                              {name}
                            </Button>
                          ))
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Request Submitted Between - Date Range */}
              <div className="flex flex-col gap-2">
                <Label>Request Submitted Between</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal cursor-pointer",
                          !filters.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.startDate ? (
                          format(filters.startDate, "yyyy-MM-dd")
                        ) : (
                          <span>Start date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.startDate}
                        onSelect={(date) =>
                          setFilters((prev) => ({ ...prev, startDate: date }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal cursor-pointer",
                          !filters.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.endDate ? (
                          format(filters.endDate, "yyyy-MM-dd")
                        ) : (
                          <span>End date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.endDate}
                        onSelect={(date) =>
                          setFilters((prev) => ({ ...prev, endDate: date }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Document Type - Combobox */}
              <div className="flex flex-col gap-2">
                <Label>Document Type</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between cursor-pointer"
                    >
                      {filters.documentType || "Select document type..."}
                      <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <div className="p-2">
                      <Input
                        placeholder="Search document type..."
                        value={documentTypeSearch}
                        onChange={(e) => setDocumentTypeSearch(e.target.value)}
                        className="mb-2"
                      />
                      <div className="max-h-[200px] overflow-auto">
                        {filteredDocumentTypes.length === 0 ? (
                          <div className="py-6 text-center text-sm text-muted-foreground">
                            No document type found.
                          </div>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start font-normal cursor-pointer"
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  documentType: "",
                                }));
                                setDocumentTypeSearch("");
                              }}
                            >
                              {!filters.documentType && (
                                <CheckIcon className="mr-2 h-4 w-4" />
                              )}
                              All
                            </Button>
                            {filteredDocumentTypes.map((type) => (
                              <Button
                                key={type}
                                variant="ghost"
                                className="w-full justify-start font-normal"
                                onClick={() => {
                                  setFilters((prev) => ({
                                    ...prev,
                                    documentType:
                                      prev.documentType === type ? "" : type,
                                  }));
                                  setDocumentTypeSearch("");
                                }}
                              >
                                {filters.documentType === type && (
                                  <CheckIcon className="mr-2 h-4 w-4" />
                                )}
                                {type}
                              </Button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Urgency - Combobox */}
              <div className="flex flex-col gap-2">
                <Label>Urgency</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between cursor-pointer"
                    >
                      {filters.urgency || "Select urgency..."}
                      <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <div className="p-2">
                      <Input
                        placeholder="Search urgency..."
                        value={urgencySearch}
                        onChange={(e) => setUrgencySearch(e.target.value)}
                        className="mb-2"
                      />
                      <div className="max-h-[200px] overflow-auto">
                        {filteredUrgencies.length === 0 ? (
                          <div className="py-6 text-center text-sm text-muted-foreground">
                            No urgency found.
                          </div>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start font-normal cursor-pointer"
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  urgency: "",
                                }));
                                setUrgencySearch("");
                              }}
                            >
                              {!filters.urgency && (
                                <CheckIcon className="mr-2 h-4 w-4" />
                              )}
                              All
                            </Button>
                            {filteredUrgencies.map((urgency) => (
                              <Button
                                key={urgency}
                                variant="ghost"
                                className="w-full justify-start font-normal"
                                onClick={() => {
                                  setFilters((prev) => ({
                                    ...prev,
                                    urgency:
                                      prev.urgency === urgency ? "" : urgency,
                                  }));
                                  setUrgencySearch("");
                                }}
                              >
                                {filters.urgency === urgency && (
                                  <CheckIcon className="mr-2 h-4 w-4" />
                                )}
                                {urgency}
                              </Button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <SheetFooter className="flex flex-row gap-2 w-full items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setIsFilterSheetOpen(false)}
                className="cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4 text-primary " />
                Go Back
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="cursor-pointer"
                >
                  <RotateCcw className="mr-2 h-4 w-4 text-destructive" />
                  Reset
                </Button>
                <Button onClick={handleApplyFilters} className="cursor-pointer">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 min-h-0 overflow-auto w-full">
        <div className="rounded-md border w-full overflow-x-auto max-w-full">
          <Table className="min-w-[800px] w-full">
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  ID
                  {getSortIcon("id")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("requestorName")}
              >
                <div className="flex items-center">
                  Requestor Name
                  {getSortIcon("requestorName")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("buFu")}
              >
                <div className="flex items-center">
                  BU/FU
                  {getSortIcon("buFu")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("documentType")}
              >
                <div className="flex items-center">
                  Document Type
                  {getSortIcon("documentType")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("urgency")}
              >
                <div className="flex items-center">
                  Urgency
                  {getSortIcon("urgency")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("documentTitle")}
              >
                <div className="flex items-center">
                  Document Title
                  {getSortIcon("documentTitle")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("documentNumber")}
              >
                <div className="flex items-center">
                  Document Number
                  {getSortIcon("documentNumber")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("submitDate")}
              >
                <div className="flex items-center">
                  Submit Date
                  {getSortIcon("submitDate")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("documentStatus")}
              >
                <div className="flex items-center">
                  Status
                  {getSortIcon("documentStatus")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              paginatedDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Link
                      href={`/document-submission/my-approved-document/${doc.id}/details`}
                      className="text-primary hover:underline font-medium"
                    >
                      {formatId(doc.id)}
                    </Link>
                  </TableCell>
                  <TableCell>{doc.requestorName}</TableCell>
                  <TableCell>{doc.buFu}</TableCell>
                  <TableCell>{doc.documentType}</TableCell>
                  <TableCell>{doc.urgency}</TableCell>
                  <TableCell>{doc.documentTitle}</TableCell>
                  <TableCell>{doc.documentNumber}</TableCell>
                  <TableCell>{formatDate(doc.submitDate)}</TableCell>
                  <TableCell>{doc.documentStatus || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4 shrink-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                className={cn(
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {(() => {
              const pages: (number | "ellipsis")[] = [];
              let lastPage = 0;

              for (let page = 1; page <= totalPages; page++) {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  if (page - lastPage > 1 && lastPage > 0) {
                    pages.push("ellipsis");
                  }
                  pages.push(page);
                  lastPage = page;
                }
              }

              return pages.map((item, index) => {
                if (item === "ellipsis") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(item);
                      }}
                      isActive={currentPage === item}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              });
            })()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className={cn(
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
