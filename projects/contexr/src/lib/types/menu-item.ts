import { Submenu } from "./submenu";
import { Option } from "./option";
import { Divider } from "./divider";

export type MenuItem<T = any> = Submenu | Option<T> | Divider;