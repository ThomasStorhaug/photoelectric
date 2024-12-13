import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const renderDot = (atValue) => {
    const DotComponent = (props) => {
        const { cx, cy, value } = props;
        if (value === atValue) {
            return <circle key={`dot_${cx}_${cy}`} cx={cx} cy={cy} r={5} fill="red" />;
        }
        return null;
    };

    DotComponent.displayName = "CustomDot"; // Add displayName here
    return DotComponent;
};

export function Plot({ data, chartConfig, type }) {
    let atValue;
    if (data.length > 2) {
        atValue = data[1]['energy eV']
    } else {
        atValue = -1
    }
    return (
        <ChartContainer config={chartConfig}>
            <LineChart data={data} margin={{ bottom: 16, left: 8, right: 8 }}>
                <CartesianGrid />
                <XAxis dataKey='x' type="number" domain={[0, 3]} label={{ value: 'Frequency (x10^15)', position: 'bottom' }} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey='energy' />} />
                <YAxis type="number" domain={[0, 10]} label={{ value: 'Energy eV', angle: -90 }} />
                <Line dataKey='energy eV' dot={renderDot(atValue)} />
            </LineChart>
        </ChartContainer>
    )
}