"use client";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import { Separator } from "@/components/ui/separator";

const SIZE = 36;
interface AvatarProps {
  src: string;
  name: string;
}

export function Avatars() {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarsStack />
    </ClientSideSuspense>
  );
}

function AvatarsStack() {
  const users = useOthers();
  const currentUser = useSelf();
  if (users.length === 0) return null;
  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2 ">
            <Avatar src={currentUser.info.avatar} name={"You"} />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
}

function Avatar({ src, name }: AvatarProps) {
  return (
    <div
      style={{ width: SIZE, height: SIZE }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap translate-opacity">
        {name}
      </div>
      <img src={src} alt="name" className="size-full rounded-full" />
    </div>
  );
}
