import React, { useEffect, useState } from "react";
import "./DataVisualization.css";
import { TailSpin } from "react-loader-spinner";
import dataService from "../../services/data";
import {
  HeatMapComponent,
  Inject,
  Adaptor,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-heatmap";

export default function DataVisualization() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    let res = await dataService.fetchData();

    if (res) {
      setLoading(false);
      if (res.status) {
        let heatmapData = res.data.data;
        setData(heatmapData);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Visualization</h2>

      {data.length > 0 ? (
        <HeatMapComponent
          dataSource={data}
          dataSourceSettings={{
            isJsonData: true,
            adaptorType: "Cell",
            xDataMapping: "Metadata_Col",
            yDataMapping: "Metadata_Row",
            valueMapping: "QC_position_effect",
          }}
          paletteSettings={{
            palette: [
              { color: "#DCD57E" },
              { color: "#A6DC7E" },
              { color: "#7EDCA2" },
              { color: "#6EB5D0" },
            ],
          }}
          cellSettings={{
            border: {
              radius: 4,
              width: 1,
              color: "white",
            },
            showLabel: true,
            format: "{value}",
          }}
        >
          <Inject services={[Legend, Tooltip, Adaptor]} />
        </HeatMapComponent>
      ) : (
        ""
      )}

      {loading ? <TailSpin color="red" radius={"8px"} /> : ""}
    </div>
  );
}
