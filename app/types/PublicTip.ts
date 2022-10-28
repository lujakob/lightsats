import { Tip, User } from "@prisma/client";

// TODO: add tipperName, expiry etc.
export type PublicTip = Pick<
  Tip,
  | "amount"
  | "tipperId"
  | "tippeeId"
  | "currency"
  | "note"
  | "status"
  | "expiry"
  | "tippeeName"
> & {
  hasClaimed: boolean;
  tipper: Pick<User, "name" | "twitterUsername" | "avatarURL"> & {
    fallbackAvatarId: string | undefined;
  };
};
