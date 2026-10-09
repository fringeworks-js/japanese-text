export type ReplacementMapDefinition<T extends string = string> = {
  /**
   * ID
   */
  readonly id: T;

  /**
   * 置換用のmap
   */
  map: [string, string][];
};
