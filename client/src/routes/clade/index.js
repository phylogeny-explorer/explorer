import React from 'react';
import Cladogram from '../../components/Cladogram';
import CladeView from '../../components/Clade/View';
import CladeForm from '../../components/Clade/Form';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';

export default {
  path: '/clades',
  action: async({ next }) => {
    const component = await next();
    if (component !== undefined) {
      return component;
    }
    
    history.push('/');
  },

  children: [
    {
      path: '/',
      action: async() => {
        const response = await new Request('/clades/tree',
          'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/:id',
      action: async(context) => {
        const response = await new Request(`/clades/tree/${context.params.id}`,
          'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/depth/:depth',
      action: async(context) => {
        const response = await new Request(`/clades/tree/depth/${context.params.depth}`,
          'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/:id/depth/:depth',
      action: async(context) => {
        const response = await
          new Request(`/clades/tree/${context.params.id}/depth/${context.params.depth}`,
            'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/info/:id',
      action: async(context) => {
        const clade = await
          new Request(`/clades/${context.params.id}`,
            'GET', {}, Request.endPoints.public).fetch();
        return <CladeView clade={clade} />;
      },
    },
    {
      path: '/evolve/:parentId',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const parent = await
          new Request(`/clades/${context.params.parentId}`,
            'GET', {}, Request.endPoints.public).fetch();
        return <CladeForm mode="Create" parent={parent} />;
      },
    },
    {
      path: '/update/:cladeId',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const clade = await
          new Request(`/clades/${context.params.cladeId}`,
            'GET', {}, Request.endPoints.public).fetch();
        return <CladeForm mode="Update" clade={clade} parent={clade.parent} />;
      },
    },
    {
      path: '/destroy/:cladeId',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const clade = await
          new Request(`/clades/${context.params.cladeId}`,
            'GET', {}, Request.endPoints.public).fetch();
        return <CladeForm mode="Destroy" clade={clade} parent={clade.parent} />;
      },
    },
  ],
};
