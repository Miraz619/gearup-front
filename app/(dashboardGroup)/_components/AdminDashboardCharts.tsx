"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartItem = {
  name: string;
  value: number;
};

type AdminDashboardChartsProps = {
  userRoleData: ChartItem[];
  rentalStatusData: ChartItem[];
};

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
];

export function AdminDashboardCharts({
  userRoleData,
  rentalStatusData,
}: AdminDashboardChartsProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      {/* User role chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Distribution</CardTitle>

          <CardDescription>
            Registered users grouped by account role.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={userRoleData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "var(--muted)",
                  }}
                />

                <Bar
                  dataKey="value"
                  name="Users"
                  fill="var(--chart-1)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Rental status chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            Rental Status Distribution
          </CardTitle>

          <CardDescription>
            Current rental orders grouped by status.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {rentalStatusData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
              No rental data available yet.
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={rentalStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {rentalStatusData.map(
                      (item, index) => (
                        <Cell
                          key={item.name}
                          fill={
                            chartColors[
                              index %
                                chartColors.length
                            ]
                          }
                        />
                      ),
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}