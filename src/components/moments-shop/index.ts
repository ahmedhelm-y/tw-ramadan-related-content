import { TabbedShop } from "../../utils/tabs";

/** Shop by Ramadan moment: round photo tabs, and the tab for this moment of the night opens first. */
export default class MomentsShop extends TabbedShop {
  protected readonly styleId = "moments-shop";
  protected readonly look = "round" as const;
}
