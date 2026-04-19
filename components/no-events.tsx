import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NoEvents() {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>No events yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Create your first event to start collecting RSVPs.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
