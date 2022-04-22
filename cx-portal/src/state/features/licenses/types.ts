import { TableType } from 'cx-portal-shared-components'
import { Nullable } from 'types/MainTypes'

export type LicenseType = {
  type: string
  data: TableType
}

export type LicensesState = {
  items: Nullable<LicenseType>
  loading: boolean
  error: string
}
