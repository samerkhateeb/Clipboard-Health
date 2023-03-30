import { getAgents } from "@/lib/helper";
import { useQuery } from "react-query";
// import PDFConverter from "@/components/PDFConverter";
import IAgent from "@/interfaces/IAgent";
import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import IShift from "@/interfaces/IShift";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    marginTop: 50,
    width: 100,
    height: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
});

const PDFC = (data?: IAgent[]) => {
  return (
    <PDFViewer width={"100%"} height={"800"}>
      <Document>
        <Page style={styles.body} size="A4">
          {data?.map(
            (
              { name, avatar, date, email, shifts, facility, status, salary },
              index
            ) => {
              return (
                <View key={index}>
                  <View style={{ display: "flex", justifyContent: "center" }}>
                    <Text wrap={false}>{`${name} - ${date} - ${email}`}</Text>
                    <Text wrap={false}>{`${salary} - ${status}`}</Text>
                  </View>
                  <View>
                    <Image src={avatar} style={styles.image} />
                    {shifts.map((shift: IShift) => {
                      return (
                        <Text>
                          {`${shift.name}: ${shift.from} - ${shift.to} / Q-${shift.quarter}`}
                        </Text>
                      );
                    })}
                    <Text
                      wrap={false}
                    >{`${facility.name} - ${facility.status} - ${facility.date}`}</Text>
                  </View>
                </View>
              );
            }
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default function PDF() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  const { isLoading, isError, data, error } = useQuery("agents", getAgents);

  if (isLoading) return <>Agent is Loading ..</>;
  if (isError) return <> Error is ${error} ..</>;

  return <>{PDFC(data)}</>;
}
