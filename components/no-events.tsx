import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NoEvents({ query }: { query?: string }) {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>No events found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            {query
              ? `No events found matching "${query}"`
              : 'Create your first event to start collecting RSVPs.'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
