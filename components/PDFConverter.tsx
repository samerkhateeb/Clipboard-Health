import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import IAgent from "@/interfaces/IAgent";
import IShift from "@/interfaces/IShift";

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    marginTop: 50,
  },
});

const PDFContent: React.FC<IAgent[]> = (Agents: Array<IAgent>) => {
  return (
    <>
      <Document>
        <Page style={styles.body}>
          <>
            {Object.values(Agents).forEach(
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
                      <Image src={avatar} />
                    </View>
                  </View>
                );
              }
            )}
          </>
        </Page>
      </Document>
    </>
  );
};

const PDFConverter: React.FC<IAgent[]> = (Agents: IAgent[]) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <PDFViewer
      width={"100%"}
      show-all="false"
      original-size="true"
      fit-to-page="true"
      render-text="false"
      page-rendered="pageRendered()"
    >
      <PDFContent {...Agents} />
    </PDFViewer>
  );
};

export default PDFConverter;
