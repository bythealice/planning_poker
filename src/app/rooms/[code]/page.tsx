import { RoomSettingsViewModel } from "@/features/rooms";

export default async function RoomSettingsPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ code: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}>) {
  const [{ code }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams ?? Promise.resolve<Record<string, string | string[] | undefined>>({}),
  ]);

  const openedFromCreation = resolvedSearchParams.opened === "1" || resolvedSearchParams.created === "1";

  return <RoomSettingsViewModel roomCode={code} openedFromCreation={openedFromCreation} />;
}

