import { Suspense } from "react";

export default async function StorageCount() {
  return <Suspense fallback={<h1>Loading...</h1>}>
    <h1>Storage Count</h1>
  </Suspense>
}