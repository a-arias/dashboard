import PagePo from '@/cypress/e2e/po/pages/page.po';
import { SharedComponentsPo } from '@/cypress/e2e/po/components/shared-components/shared-components.po';
import { FleetDashboardPagePo } from '@/cypress/e2e/po/pages/fleet/fleet-dashboard.po';
import ProductNavPo from '@/cypress/e2e/po/side-bars/product-side-nav.po';
import FleetTokensCreateEditPo from '@/cypress/e2e/po/edit/fleet/fleet.cattle.io.clusterregistrationtoken.po';

export class FleetClusterRegistrationTokenListPagePo extends PagePo {
  static url = `/c/_/fleet/fleet.cattle.io.clusterregistrationtoken`

  constructor() {
    super(FleetClusterRegistrationTokenListPagePo.url);
  }

  goTo() {
    return cy.visit(FleetClusterRegistrationTokenListPagePo.url);
  }

  static navTo() {
    const fleetDashboardPage = new FleetDashboardPagePo('_');

    FleetDashboardPagePo.navTo();
    fleetDashboardPage.waitForPage();

    const sideNav = new ProductNavPo();

    sideNav.navToSideMenuGroupByLabel('Advanced');
    sideNav.navToSideMenuEntryByLabel('Cluster Registration Tokens');
  }

  sharedComponents() {
    return new SharedComponentsPo(this.self());
  }

  createTokenForm(fleetWorkspace?: string, id?: string): FleetTokensCreateEditPo {
    return new FleetTokensCreateEditPo(fleetWorkspace, id);
  }
}
