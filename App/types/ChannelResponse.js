// @flow
export type TChannelResponse = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    commentCount: string;
    subscriberCount: string;
    videoCount: string;
  };
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords: string;
      defaultTab: string;
      trackingAnalyticsAccountId: string;
      moderateComments: boolean;
      showRelatedChannels: boolean;
      showBrowseView: boolean;
      featuredChannelsTitle: string;
      unsubscribedTrailer: string;
      profileColor: string
    };
    watch: {
      textColor: string;
      backgroundColor: string;
      featuredPlaylistId: string
    };
    image: {
      bannerImageUrl: string;
      bannerMobileImageUrl: string;
      backgroundImageUrl: {
        default: string;
      };
      largeBrandedBannerImageImapScript: {
        default: string;
      };
      largeBrandedBannerImageUrl: {
        default: string;
      };
      smallBrandedBannerImageImapScript: {
        default: string;
      };
      smallBrandedBannerImageUrl: {
        default: string;
      };
      watchIconImageUrl: string;
      trackingImageUrl: string;
      bannerTabletLowImageUrl: string;
      bannerTabletImageUrl: string;
      bannerTabletHdImageUrl: string;
      bannerTabletExtraHdImageUrl: string;
      bannerMobileLowImageUrl: string;
      bannerMobileMediumHdImageUrl: string;
      bannerMobileHdImageUrl: string;
      bannerMobileExtraHdImageUrl: string;
      bannerTvImageUrl: string;
      bannerExternalUrl: string
    };
  };
}
