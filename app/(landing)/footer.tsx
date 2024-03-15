import { FC } from "react";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { LanguageButton } from "./language-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const languages = [
  { code: "/us.svg", name: "Inglês" },
  { code: "/es.svg", name: "Espanhol" },
  { code: "/jp.svg", name: "Japonês" },
  { code: "/fr.svg", name: "Francês" },
  { code: "/it.svg", name: "Italiano" },
];

export const Footer: FC = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <ClerkLoading>
          <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedOut>
            {languages.map((lang) => (
              <LanguageButton
                key={lang.name}
                code={lang.code}
                name={lang.name}
              />
            ))}
          </SignedOut>

          <SignedIn>
            {languages.map((lang) => (
              <Link href={"/learn"} key={lang.name}>
                <Button size="lg" variant="ghost" className="w-full">
                  <Image
                    src={lang.code}
                    alt={lang.name}
                    height={32}
                    width={40}
                    className="mr-4 rounded-md"
                  />
                  {lang.name}
                </Button>
              </Link>
            ))}
          </SignedIn>
        </ClerkLoaded>
      </div>
    </footer>
  );
};
