"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CandlestickChartIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react"
import { format } from "date-fns"
import { Area, Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })
  const [stockFilter, setStockFilter] = useState("all")

  // Sample stock data
  const stockData = [
    { date: "2023-01-01", AAPL: 130.21, MSFT: 242.12, GOOGL: 89.7, AMZN: 85.82, volume: 1200000 },
    { date: "2023-02-01", AAPL: 143.8, MSFT: 252.75, GOOGL: 95.22, AMZN: 103.39, volume: 1500000 },
    { date: "2023-03-01", AAPL: 151.03, MSFT: 265.44, GOOGL: 106.06, AMZN: 93.5, volume: 1800000 },
    { date: "2023-04-01", AAPL: 169.68, MSFT: 288.45, GOOGL: 108.22, AMZN: 102.4, volume: 1600000 },
    { date: "2023-05-01", AAPL: 173.57, MSFT: 308.97, GOOGL: 122.83, AMZN: 120.58, volume: 2000000 },
    { date: "2023-06-01", AAPL: 189.25, MSFT: 337.34, GOOGL: 119.7, AMZN: 129.33, volume: 2200000 },
    { date: "2023-07-01", AAPL: 193.97, MSFT: 338.37, GOOGL: 133.01, AMZN: 133.68, volume: 1900000 },
    { date: "2023-08-01", AAPL: 187.87, MSFT: 326.05, GOOGL: 130.69, AMZN: 137.85, volume: 1700000 },
    { date: "2023-09-01", AAPL: 171.21, MSFT: 312.79, GOOGL: 137.36, AMZN: 129.12, volume: 1850000 },
    { date: "2023-10-01", AAPL: 170.77, MSFT: 329.81, GOOGL: 123.4, AMZN: 127.74, volume: 1950000 },
    { date: "2023-11-01", AAPL: 189.37, MSFT: 369.85, GOOGL: 133.32, AMZN: 146.88, volume: 2100000 },
    { date: "2023-12-01", AAPL: 193.58, MSFT: 376.04, GOOGL: 139.69, AMZN: 153.42, volume: 2300000 },
  ]

  // Stock performance data
  const stockPerformance = [
    { symbol: "AAPL", name: "Apple Inc.", price: 193.58, change: 4.21, changePercent: 2.22, volume: 78500000 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 376.04, change: 6.19, changePercent: 1.67, volume: 25300000 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 139.69, change: 6.37, changePercent: 4.78, volume: 32100000 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 153.42, change: 6.54, changePercent: 4.45, volume: 45700000 },
  ]

  // Chart configuration
  const chartConfig = {
    AAPL: {
      label: "Apple",
      color: "hsl(var(--chart-1))",
    },
    MSFT: {
      label: "Microsoft",
      color: "hsl(var(--chart-2))",
    },
    GOOGL: {
      label: "Google",
      color: "hsl(var(--chart-3))",
    },
    AMZN: {
      label: "Amazon",
      color: "hsl(var(--chart-4))",
    },
    volume: {
      label: "Volume",
      color: "hsl(var(--chart-5))",
    },
  }

  // Filter data based on selected date range
  const filteredData = stockData.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate >= dateRange.from && itemDate <= dateRange.to
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Stock Market Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search stocks..." className="w-[200px] pl-8" />
          </div>
        </div>
      </header>
      <div className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {stockPerformance.map((stock) => (
          <Card key={stock.symbol}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stock.name}</CardTitle>
              <CandlestickChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
              <div className="flex items-center">
                <span className={stock.change > 0 ? "text-emerald-500" : "text-rose-500"}>
                  {stock.change > 0 ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  )}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
                <span className="ml-2 text-xs text-muted-foreground">Today</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-5">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Stock Price Trends</CardTitle>
              <CardDescription>Compare stock prices over time</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select stocks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stocks</SelectItem>
                  <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
                  <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
                  <SelectItem value="GOOGL">Google (GOOGL)</SelectItem>
                  <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Adjust settings</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-[4/2]">
              <ComposedChart data={filteredData} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", { month: "short" })
                  }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  domain={[0, "dataMax"]}
                  hide={stockFilter !== "all"}
                />
                {(stockFilter === "all" || stockFilter === "AAPL") && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="AAPL"
                    stroke="var(--color-AAPL)"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {(stockFilter === "all" || stockFilter === "MSFT") && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="MSFT"
                    stroke="var(--color-MSFT)"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {(stockFilter === "all" || stockFilter === "GOOGL") && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="GOOGL"
                    stroke="var(--color-GOOGL)"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {(stockFilter === "all" || stockFilter === "AMZN") && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="AMZN"
                    stroke="var(--color-AMZN)"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {stockFilter === "all" && (
                  <Bar yAxisId="right" dataKey="volume" fill="var(--color-volume)" opacity={0.3} barSize={20} />
                )}
                <ChartTooltip content={<ChartTooltipContent />} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
            <CardDescription>Monthly trading volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ volume: chartConfig.volume }} className="aspect-[4/3]">
              <ComposedChart data={filteredData} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", { month: "short" })
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  fill="var(--color-volume)"
                  stroke="var(--color-volume)"
                  fillOpacity={0.2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Stock Details</CardTitle>
            <CardDescription>Detailed information about each stock</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Change %</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockPerformance.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                        <TableCell className={`text-right ${stock.change > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {stock.change > 0 ? "+" : ""}
                          {stock.change.toFixed(2)}
                        </TableCell>
                        <TableCell className={`text-right ${stock.change > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {stock.change > 0 ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right">{(stock.volume / 1000000).toFixed(1)}M</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="performance">
                <div className="text-center py-8 text-muted-foreground">
                  Performance metrics would be displayed here
                </div>
              </TabsContent>
              <TabsContent value="fundamentals">
                <div className="text-center py-8 text-muted-foreground">
                  Fundamental analysis would be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

