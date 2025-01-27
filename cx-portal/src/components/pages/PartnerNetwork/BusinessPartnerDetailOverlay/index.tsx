import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Typography,
} from 'cx-portal-shared-components'
import {
  PartnerNetworkDataGrid,
  BpdmTypeUUIDKeyPair,
} from 'state/features/partnerNetwork/types'
import { Box, Grid, useTheme } from '@mui/material'

interface BusinessPartnerDetailOverlayProps {
  openDialog?: boolean
  selectedRowBPN: PartnerNetworkDataGrid
  handleOverlayClose: React.MouseEventHandler
}

export const DetailGridRow = ({
  variableName,
  value,
}: {
  variableName: string
  value: string
}) => {
  const { palette, spacing } = useTheme()
  return (
    <>
      <Grid
        item
        xs={5}
        style={{
          borderBottom: `1px solid ${palette.grey['200']}`,
          marginTop: 0,
          padding: spacing(1.5),
        }}
      >
        <span>{variableName}</span>
      </Grid>
      <Grid
        item
        xs={7}
        style={{
          borderBottom: `1px solid ${palette.grey['200']}`,
          marginTop: 0,
          padding: spacing(1.5),
        }}
      >
        <span>{value}</span>
      </Grid>
    </>
  )
}

const BusinessPartnerDetailOverlay = ({
  openDialog = false,
  selectedRowBPN,
  handleOverlayClose,
}: BusinessPartnerDetailOverlayProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme

  return (
    <div className={'business-partner-overlay'}>
      <Dialog
        open={openDialog}
        // sx={{
        //   '.MuiDialog-paper': {
        //     maxWidth: 700,
        //   },
        // }}
      >
        <DialogHeader
          {...{
            title: t('content.partnernetwork.overlay.title'),
            closeWithIcon: true,
            onCloseWithIcon: handleOverlayClose,
          }}
        />

        <DialogContent
          sx={{
            padding: '0 30px',
            marginBottom: 5,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={1.5} style={{ marginTop: 0 }}>
              <Grid
                xs={12}
                item
                style={{
                  backgroundColor: theme.palette.grey['100'],
                  padding: spacing(2),
                }}
              >
                <Typography variant="h5">
                  {t('content.partnernetwork.overlay.companydatatitle')}
                </Typography>
              </Grid>
              <DetailGridRow
                key={t('content.partnernetwork.columns.name') as string}
                {...{
                  variableName: `${t('content.partnernetwork.columns.name')}`,
                  value: selectedRowBPN.name,
                }}
              />
              <DetailGridRow
                key={t('content.partnernetwork.columns.bpn') as string}
                {...{
                  variableName: `${t('content.partnernetwork.columns.bpn')}`,
                  value: selectedRowBPN.bpn,
                }}
              />
              {selectedRowBPN.legalForm && (
                <DetailGridRow
                  key={t('content.partnernetwork.overlay.legalform') as string}
                  {...{
                    variableName: `${t(
                      'content.partnernetwork.overlay.legalform'
                    )}`,
                    value: selectedRowBPN.legalForm,
                  }}
                />
              )}
              <Grid
                xs={12}
                item
                style={{
                  backgroundColor: theme.palette.grey['100'],
                  padding: spacing(2),
                }}
              >
                <Typography variant="h5">Address</Typography>
              </Grid>
              <DetailGridRow
                key="Street"
                {...{ variableName: 'Street', value: selectedRowBPN.street }}
              />
              <DetailGridRow
                key="PLZ / City"
                {...{
                  variableName: 'PLZ / City',
                  value: `${selectedRowBPN.zipCode} ${selectedRowBPN.city}`,
                }}
              />
              <DetailGridRow
                key="Country"
                {...{ variableName: 'Country', value: selectedRowBPN.country }}
              />
              <Grid
                xs={12}
                item
                style={{
                  backgroundColor: theme.palette.grey['100'],
                  padding: spacing(2),
                }}
              >
                <Typography variant="h5">Identifiers</Typography>
              </Grid>
              {selectedRowBPN.identifiers?.map(
                (identifier: BpdmTypeUUIDKeyPair) => {
                  return (
                    <DetailGridRow
                      key={identifier.type?.name}
                      {...{
                        variableName:
                          identifier.type?.name ||
                          identifier.type?.technicalKey,
                        value: identifier.value,
                      }}
                    />
                  )
                }
              )}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BusinessPartnerDetailOverlay
