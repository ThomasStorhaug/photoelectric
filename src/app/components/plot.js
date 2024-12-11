import { ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

export function Plot({ data, chartConfig }) {

    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data}>
                <XAxis dataKey='x' />
                <YAxis />
                <Line dataKey='y' />
            </LineChart>
        </ChartContainer>
    )
}