import dynamic from "next/dynamic";

const AgentPDF = dynamic((): any => import("./pdf"), {
  ssr: false,
});

export default function generateReport() {
  return <AgentPDF />;
}
