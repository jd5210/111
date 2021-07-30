import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from '../../../../contexts/Localization'
import useGuildSettings from '../../hooks/useGuildSettings'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface EmissionProps {
  guildSlug: string
  poolRewardsPerBlock: string
}

const EmissionWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Emission: React.FunctionComponent<EmissionProps> = ({ poolRewardsPerBlock, guildSlug }) => {
  const guildSettings = useGuildSettings(guildSlug)
  const rewardsPerBlock = new BigNumber(poolRewardsPerBlock)
  const displayEmission = rewardsPerBlock.gt(0) ? (
    `${Number(rewardsPerBlock.toJSON()).toFixed(4)}`
  ) : (
    <Skeleton width={60} />
  )
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('%rewards% %sym% / block ', { rewards: rewardsPerBlock.toJSON(), sym: guildSettings.symbol }),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <EmissionWrapper>
        <Text>{displayEmission}</Text>
      </EmissionWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Emission
