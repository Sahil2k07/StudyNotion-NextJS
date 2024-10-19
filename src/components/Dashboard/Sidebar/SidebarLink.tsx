import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "react-icons/vsc";

type SidebarLinkProps = {
  link: {
    name: string;
    path: string;
  };
  iconName: keyof typeof Icons;
};

function SidebarLink({ link, iconName }: SidebarLinkProps) {
  const Icon = Icons[iconName];

  const pathname = usePathname();

  const matchRoute = (route: string) => {
    return pathname.startsWith(route);
  };

  return (
    <Link
      href={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </Link>
  );
}

export default SidebarLink;
