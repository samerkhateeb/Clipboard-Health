import { useDispatch, useSelector } from "react-redux";

import { BiUserPlus, BiX } from "react-icons/bi";
import Form from "@/components/Agents/Form";
import Head from "next/head";
import Table from "@/components/Agents/Table";
import {
  rChangeEmpID,
  rDeleteAgent,
  rToggleChangeAction,
} from "@/redux/Agents/agentSlice";
import { useEffect, useState } from "react";
import { deleteAgent, getAgents } from "@/lib/helper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dynamic from "next/dynamic";

const AgentPDF = dynamic((): any => import("./pdf"), {
  ssr: false,
});

export default function generateReport() {
  return <AgentPDF />;
}
