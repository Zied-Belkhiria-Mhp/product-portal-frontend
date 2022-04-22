import { TableType } from './types'
import { VerticalTable } from './VerticalTable'

export const StaticTable = ({
  data,
  horizontal,
}: {
  data: TableType
  horizontal?: boolean
}) => (
  horizontal
  ? <span>Horizontal table is not implemented yet</span>
  : <VerticalTable data={data} />
  )
