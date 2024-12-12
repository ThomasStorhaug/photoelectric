import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export function Plot({ data, chartConfig, type }) {
    const types = {
        'energy-frequency': {
            xLabel: 'Frequency (x10^15 Hz)',
            yLabel: 'Energy eV'
        }
    }
    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data}>
                <CartesianGrid />
                <XAxis dataKey='x' type="number" domain={[0, 3]} />
                <YAxis type="number" domain={[0, 10]} />
                <ChartTooltip content={<ChartTooltipContent nameKey='Frequency' hideLabel />} />
                <Line dataKey='y' dot={false} />
            </LineChart>
        </ChartContainer>
    )
}