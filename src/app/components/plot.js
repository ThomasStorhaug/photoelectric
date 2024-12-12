import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const renderDot = (atValue) => (props) => {
    const { cx, cy, value } = props;
    if (value === atValue) {
        return <circle key={`dot_${cx}_${cy}`} cx={cx} cy={cy} r={5} fill="red" />
    }
}
renderDot.displayName = 'renderDot'

export function Plot({ data, chartConfig, type }) {
    const atValue = data[1]['energy eV']
    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data} margin={{ bottom: 16, left: 8, right: 8 }}>
                <CartesianGrid />
                <XAxis dataKey='x' type="number" domain={[0, 3]} label={{ value: 'Frequency (x10^15)', position: 'bottom' }} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey='energy' labelFormatter={(value,) => (`p p ${value}`)} />} />
                <YAxis type="number" domain={[0, 10]} />
                <Line dataKey='energy eV' dot={renderDot(atValue)} />
            </LineChart>
        </ChartContainer>
    )
}