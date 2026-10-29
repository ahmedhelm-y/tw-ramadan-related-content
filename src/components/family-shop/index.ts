import { TabbedShop } from "../../utils/tabs";

/** For the whole family: pill tabs such as women, men and kids. */
export default class FamilyShop extends TabbedShop {
  protected readonly styleId = "family-shop";
  protected readonly look = "pills" as const;
}
