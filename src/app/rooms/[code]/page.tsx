import { RoomSettingsViewModel } from "@/features/rooms";

export default function RoomSettingsPage({
  params,
  searchParams,
}: Readonly<{
  params: { code: string };
  searchParams?: Record<string, string | string[] | undefined>;
}>) {
  const openedFromCreation = searchParams?.opened === "1" || searchParams?.created === "1";

  return <RoomSettingsViewModel roomCode={params.code} openedFromCreation={openedFromCreation} />;
}

