import {
  CheckCircle2Icon,
  CircleCheckBigIcon,
  FileBadge2Icon,
  GaugeIcon,
  HistoryIcon,
  ListTodoIcon,
} from "lucide-react";

export const documentFunctions = [
  {
    id: 0,
    title: "Dashboard",
    description: "Your dashboard",
    href: "/document-submission",
    icon: GaugeIcon,
  },
  {
    id: 1,
    title: "Recent Documents",
    description: "List all documents within last 3 days",
    href: "/document-submission/recent-document",
    icon: HistoryIcon,
  },
  {
    id: 2,
    title: "Document List",
    description: "List all documents",
    href: "/document-submission/document-list",
    icon: FileBadge2Icon,
  },
  {
    id: 3,
    title: "My Pending Approval",
    description: "List all your pending approval.",
    href: "/document-submission/my-pending-approval",
    icon: ListTodoIcon,
  },
  {
    id: 4,
    title: "My Approved Documents",
    description: "List all document you approved.",
    href: "/document-submission/my-approved-document",
    icon: CircleCheckBigIcon,
  },
];
