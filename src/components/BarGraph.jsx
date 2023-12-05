import { useTheme } from "@mui/material";
import { Bar, ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import {
  dummyBarData as dataBar,
  dummyBarBreakdown as dataDetails,
} from "../data/dummyData";

const BarGraph = ({ ratings, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columnColors = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"];
  const colorScale = (columnIndex) => {
    return columnColors[columnIndex % columnColors.length];
  };

  //const data = reportDetails ? dataDetails : dataBar;
  // const colorColumn = reportDetails ? (d) => d.data.color : {scheme: "nivo"};
  const colorColumn = ratings ? (d) => colorScale(d.index) : { scheme: "nivo" };

  // const keysDashboard = ["student", "supervisor", "peer", "self"];
  // const keysReports = ["rating"];
  //const keys = reportDetails ? keysReports : keysDashboard;
  // const axisLabelDisplay = reportDetails ? 'score' : 'category';

  // const modifiedData = data.map((item) => ({
  //   ...item,
  //   student: (item.student * 0.6).toFixed(2),
  //   supervisor: (item.supervisor * 0.3).toFixed(2),
  //   peer: (item.peer * 0.05).toFixed(2),
  //   self: (item.self * 0.05).toFixed(2),
  // }));

  const customTooltip = ({ id, value, color }) => (
    <div
      style={{
        padding: 12,
        color: color,
        background: "#222222",
      }}
    >
      <strong>
        {id}: {value}
      </strong>
    </div>
  );
  const legends = [
    {
      dataFrom: "indexes",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 0,
      translateY: type === "faculty" ? 75 : 120,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "right-to-left",
      itemOpacity: 0.85,
      symbolSize: 20,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ];
  // const legends = ratings
  //   ? undefined
  //   : [
  //       {
  //         dataFrom: "keys",
  //         anchor: "bottom-right",
  //         direction: "column",
  //         justify: false,
  //         translateX: 120,
  //         translateY: 0,
  //         itemsSpacing: 2,
  //         itemWidth: 100,
  //         itemHeight: 20,
  //         itemDirection: "left-to-right",
  //         itemOpacity: 0.85,
  //         symbolSize: 20,
  //         effects: [
  //           {
  //             on: "hover",
  //             style: {
  //               itemOpacity: 1,
  //             },
  //           },
  //         ],
  //       },
  //     ];

  return (
    <Bar
      // data={data}
      // data={modifiedData}
      // data={isDashboard ? modifiedData : data}
      height={400}
      width={640}
      data={ratings}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              stokewidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      // keys={[
      //     'student',
      //     'supervisor',
      //     'peer',
      //     'self',
      //     'score',
      // ]}
      keys={["rating"]}
      indexBy="category"
      //margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      margin={{ top: 0, right: 50, bottom: 120, left: 50 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // colors={{ scheme: 'nivo' }}
      colors={colorColumn}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisLeft={null}
      // axisBottom={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 7,
      //   // legend: isDashboard ? undefined : 'country',
      //   // legend: 'category',
      //   // legend: axisLabelDisplay,
      //   legendPosition: "middle",
      //   legendOffset: 32,
      // }}
      axisBottom={null}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: isDashboard ? undefined : 'food',
        // legend: "category",
        // legend: axisLabelDisplay,
        legendPosition: "middle",
        legendOffset: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={legends}
      // legends={[
      //     {
      //         dataFrom: 'keys',
      //         anchor: 'bottom-right',
      //         direction: 'column',
      //         justify: false,
      //         translateX: 120,
      //         translateY: 0,
      //         itemsSpacing: 2,
      //         itemWidth: 100,
      //         itemHeight: 20,
      //         itemDirection: 'left-to-right',
      //         itemOpacity: 0.85,
      //         symbolSize: 20,
      //         effects: [
      //             {
      //                 on: 'hover',
      //                 style: {
      //                     itemOpacity: 1
      //                 }
      //             }
      //         ]
      //     }
      // ]}
      // legends={[
      //   {
      //     dataFrom: "indexes",
      //     anchor: "right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 150,
      //     translateY: 50,
      //     itemWidth: 140,
      //     itemHeight: 20,
      //     itemsSpacing: 1,
      //     symbolSize: 20,
      //     itemDirection: "bottom-to-top",
      //   },
      // ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      // barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      // barAriaLabel={(e) => {
      //     if (Array.isArray(e)) {
      //         const firstBar = e[0];
      //         return firstBar.id + ": " + firstBar.formattedValue + " in country: " + firstBar.indexValue;
      //     }
      //     return "";
      // }}
      tooltip={customTooltip}
    />
  );
};

export default BarGraph;
