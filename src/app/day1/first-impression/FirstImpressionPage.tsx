// components/ProfileListPage.tsx
import ActivityDesc from "@/components/common/ActivityDesc";
import React from "react";

function FirstImpressionPage() {
  return (
    <div className="w-full px-6 lg:px-0">
      <ActivityDesc day={0} activity={2} project_id={1}/>
    </div>
  )
}

export default FirstImpressionPage;
