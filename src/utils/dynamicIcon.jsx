import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";

const libraries = { Fa: FaIcons, Io: IoIcons, Md: MdIcons, Bi: BiIcons, Gi: GiIcons };

export default function DynamicIcon({ name = "FaQuestionCircle", size = 24, className = "" }) {
  if (!name || typeof name !== "string") {
    return <FaIcons.FaQuestionCircle size={size} className={className} />;
  }

  // Extract prefix (first two letters)
  const prefix = name.match(/^[A-Z][a-z]*/)?.[0] || "Fa";
  const library = libraries[prefix];

  if (!library) {
    console.warn(`DynamicIcon: Library for prefix "${prefix}" not found.`);
    return <FaIcons.FaQuestionCircle size={size} className={className} />;
  }

  const IconComponent = library[name];

  if (!IconComponent) {
    console.warn(`DynamicIcon: Icon "${name}" not found in library "${prefix}".`);
    return <FaIcons.FaQuestionCircle size={size} className={className} />;
  }

  return(
    <>
     <IconComponent size={size} className={className} />
    </>
  );
}
