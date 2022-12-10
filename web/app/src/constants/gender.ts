export const GENDER = ["MALE", "FEMALE"] as const;

export const GENDER_TEXTS: Record<typeof GENDER[number], string> = {
  MALE: "男性",
  FEMALE: "女性",
};
