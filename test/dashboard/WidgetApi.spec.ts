import { expect } from 'chai';
import WolkREST from '../../src/index';
import * as fromResources from './resources/index';
import Widget from '../../src/dashboard/model/Widget';
import WidgetItem from '../../src/dashboard/model/WidgetItem';
import Dashboard from '../../src/dashboard/model/Dashboard';
import { getAuthenticatedWolkRestInstance } from '../utils';

describe('Widget API', () => {
  let wolkRest: WolkREST;
  let newWidgetId: number;
  let widgetItems: WidgetItem[];

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[POST] /api/dashboard/{dashboardId}/widget', async () => {
    it('Should create reading widget on dashboard', async () => {
      const { data: id, status } = await wolkRest.widget().create(
        fromResources.dashboardId,
        fromResources.readingWidgetDataNoId
      );
      newWidgetId = id;
      expect(id).to.not.be.undefined;
      expect(status).to.be.equal(201);
    });
  });

  context('[POST] /api/dashboard/{dashboardId}/widget', async () => {
    it('Should not create reading widget on non existing dashboard', async () => {
      try {
        await wolkRest.widget().create(
          0,
          fromResources.readingWidgetData
        );
      } catch ({ code, type }) {
        expect(code).to.be.equal(404);
        expect(type).to.be.equal('NOT_FOUND');
      }
    });
  });

  context('[GET] /api/dashboard/{dashboardId}/widgets/{id}', async () => {
    it('Should get single Widget', async () => {
      const { data: widget, status } = await wolkRest.widget().read(
        fromResources.dashboardId,
        newWidgetId
      );

      expect(status).to.be.equal(200);
      expect(widget.id).to.equal(newWidgetId);
    });
  });

  context('[PUT] /api/dashboards/{dashboardId}/widgets/{id}', async () => {
    // Create brand to be updated
    before(async () => {
      await wolkRest.widget().create(fromResources.dashboardId, fromResources.readingWidgetDataNoId);

      const { data: widget } = await wolkRest.widget().read(fromResources.dashboardId, newWidgetId);
      widgetItems =  widget.items;

    });

    it('Should update widget', async () => {
      const updateDto = {
        id: newWidgetId,
        col: 1,
        row: 1,
        items: widgetItems
      };

      const widgetDto: Widget = Object.assign(fromResources.readingWidgetDataNoId, updateDto);
      const { status } = await wolkRest.widget().update(fromResources.dashboardId, widgetDto);

      expect(status).to.be.equal(200);
    });
  });

  context('[DELETE] /api/dashboards/{dashboardId}/widgets/{id}', async () => {
    it('Should delete widget', async () => {
      const { status } = await wolkRest.widget().delete(fromResources.dashboardId, newWidgetId);

      expect(status).to.be.equal(200);
    });
  });

  context('[PUT] /api/dashboards/{dashboardId}/widgets', async () => {
    let dashboardList: any;

    before(async () => {
      const { data } = await wolkRest.dashboard().list();
      dashboardList = data;
    });

    it('Should UPDATE widgets bulk', async () => {
      const { widgets } = dashboardList.find((dashboard: Dashboard) => fromResources.dashboardId === dashboard.id);
      const { status } = await wolkRest.widget().updateBulk(fromResources.dashboardId, widgets);

      expect(status).to.be.equal(200);
    });
  });

});
