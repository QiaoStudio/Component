<template>
  <div :class="[nationalType]">
    <dp-footer :links="links"
               :social-media="socialMedia"
               :countries="countries"
               :copyright="copyright"
               :policy-links="policyLinks" />
  </div>
</template>
<script>
const nationalMode = {
  'Default': '',
  'TH': 'dp-theme-th',
  'HK': 'dp-theme-hk'
}
export default {
  data () {
    return {
      nationalType: select('National Type', nationalMode, ''),
      links: array('Links', [
        {
          'columnClass': 'col-lg-2',
          'title': 'GoBear',
          'items': [
            {
              'columnClass': 'col-sm-12',
              'title': 'About us',
              'url': '/sg/about-us'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Company',
              'url': '/sg/company'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Blog',
              'url': '/sg/blog'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Newsroom',
              'url': '/sg/newsroom'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Careers',
              'url': '/sg/careers'
            }
          ]
        },
        {
          'columnClass': 'col-lg-2',
          'title': 'Learn',
          'items': [
            {
              'columnClass': 'col-sm-12',
              'title': 'Insurance guides',
              'url': '/sg/insurance-guides'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Banking guides',
              'url': '/sg/banking-guides'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Insurance providers',
              'url': '/sg/insurance-providers'
            },
            {
              'columnClass': 'col-sm-12',
              'title': 'Banking providers',
              'url': '/sg/banking-providers'
            }
          ]
        },
        {
          'columnClass': 'col-lg-4',
          'title': 'Compare',
          'items': [
            {
              'columnClass': 'col-sm-6',
              'title': 'Travel insurance',
              'url': '/sg/travel-insurance'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Health insurance',
              'url': '/sg/health-insurance'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Car insurance',
              'url': '/sg/car-insurance'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Life insurance',
              'url': '/sg/life-insurance'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Credit cards',
              'url': '/sg/credit-cards'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Fixed deposits',
              'url': '/sg/fixed-deposits'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Bank accounts',
              'url': '/sg/bank-accounts'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Home loans',
              'url': '/sg/home-loans'
            },
            {
              'columnClass': 'col-sm-6',
              'title': 'Personal loans',
              'url': '/sg/personal-loans'
            }
          ]
        }
      ]),
      socialMedia: {
        'title': text('Social Media Title', 'Follow'),
        'items': array('Social Media Items', [
          {
            'icon': 'facebook',
            'url': 'https://www.facebook.com/GoBearSG'
          },
          {
            'icon': 'google-plus',
            'url': 'https://plus.google.com/102127287818215088544'
          },
          {
            'icon': 'twitter',
            'url': 'https://twitter.com/xxxxxxsg'
          }
        ])
      },
      countries: array('Countries', [
        {
          'name': 'hk',
          'url': '/hk'
        },
        {
          'name': 'id',
          'url': '/id'
        },
        {
          'name': 'my',
          'url': '/my'
        },
        {
          'name': 'ph',
          'url': '/ph'
        },
        {
          'name': 'sg',
          'url': '/sg'
        },
        {
          'name': 'th',
          'url': '/th'
        },
        {
          'name': 'vn',
          'url': '/vn'
        }
      ]),
      copyright: text('Copyright Text', '© 2019 Woodpecker Asia Tech Pte. Ltd. All rights reserved.'),
      policyLinks: array('Policy Links', [
        {
          'title': 'Terms',
          'url': '/sg/terms-and-conditions'
        },
        {
          'title': 'Privacy',
          'url': '/sg/privacy-policy'
        }
      ])
    }
  }
}
</script>
