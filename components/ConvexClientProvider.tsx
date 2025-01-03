"use client";

import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { ReactNode } from "react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Loader2 } from "lucide-react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex items-center justify-center w-full h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <div className="flex items-center justify-center w-full h-screen">
            <Loader2 className="animate-spin h-12 w-12" />
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
