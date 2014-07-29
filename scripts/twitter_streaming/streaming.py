from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json

# Need to create this from secrets.py.template
from secrets import *

bounds = [-123.16, 45.39, -122.36, 45.65] # portland metro-ish
bounds = [-125.0011, 24.9493, -66.9326, 49.5904]  # US

nongeo = 0

class StdOutListener(StreamListener):
    """ A listener handles tweets are the received from the stream.
    This is a basic listener that just prints received tweets to stdout.

    """
    def on_data(self, datas):
        data = json.loads(datas)

        # It's a limit message, ignore it
        if 'limit' in data.keys():
            return True

        # No geo coordinates, ignore it
        if not data['coordinates']:
            print ".",
            return True

        # Geography filter, ignore it if outside of bounds
        geom = data['coordinates']
        lon = geom['coordinates'][0]
        lat = geom['coordinates'][1]
        if lon < bounds[0] or lon > bounds[2] or lat < bounds[1] or lat > bounds[3]:
            return True

        print 
        print
        print data['user']['screen_name']
        print data['text']
        print geom
        print 
        return True

    def on_error(self, status):
        print status

if __name__ == '__main__':
    listener = StdOutListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    stream = Stream(auth, listener)
    stream.filter(
        track=[
            "forestry",
            "agriculture",
            "climate",
            "ecology",
            "conservation",
            "food",
            "beer",
        ],
    )
