import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StorageUsageProps {
    used: number
    total: number
}

export function StorageUsage({ used, total }: StorageUsageProps) {
    const percentage = (used / total) * 100

    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Storage Usage</h3>
                <Progress value={percentage} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                    {used.toFixed(1)} GB of {total} GB used ({percentage.toFixed(1)}%)
                </p>
            </CardContent>
        </Card>
    )
}