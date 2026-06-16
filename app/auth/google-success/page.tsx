import { Suspense } from "react";
import GoogleSuccessClient from "./GoogleSuccessClient";

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={null}>
      <GoogleSuccessClient />
    </Suspense>
  );
}
