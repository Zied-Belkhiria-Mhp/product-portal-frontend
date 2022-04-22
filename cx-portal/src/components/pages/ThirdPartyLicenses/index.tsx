import { SearchInput, StaticTable } from 'cx-portal-shared-components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from 'state/features/licenses/actions'
import { licensesSelector } from 'state/features/licenses/slice'
import debounce from 'lodash.debounce'

export default function ThirdPartyLicenses() {
  const { t } = useTranslation('footer', { keyPrefix: 'licenses' })
  const dispatch = useDispatch()
  const [filterExpr, setFilterExpr] = useState<string>('')
  const [filter, setFilter] = useState<RegExp>(/./)
  const { items } = useSelector(licensesSelector)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        setFilter(new RegExp(expr, 'i'))
      }, 300),
    [setFilter]
  )

  const doFilter = useCallback(
    (expr: string) => {
      setFilterExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  return (
    <main>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
      <SearchInput
        margin="normal"
        autoFocus={true}
        value={filterExpr}
        onChange={(event) => doFilter(event.target.value)}
      />
      {items?.data ? (
        <StaticTable
          horizontal={false}
          data={{
            head: items.data.head,
            body: items?.data.body.filter(
              (pkg: string[]) =>
                filter.test(pkg[0]) ||
                filter.test(pkg[2]) ||
                filter.test(pkg[5])
            ),
          }}
        />
      ) : (
        <span>no data</span>
      )}
    </main>
  )
}
