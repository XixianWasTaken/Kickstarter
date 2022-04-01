import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address)
        const summary = await campaign.methods.getSummary().call()
        console.log(summary)
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount:summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount,
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Arress of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },{
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },{
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract., Requests must be appreved by approvers'
            },{
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign'
            },{
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campain Balance (ETH)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ]
        return <Card.Group items = {items} />
    }

    render () {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm  address = {this.props.address}/>
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow