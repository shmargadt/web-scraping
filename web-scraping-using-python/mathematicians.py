from bs4 import BeautifulSoup
from networkHelper import simple_get

def get_ynet_data():
    """
    Downloads the main page of ynet
    and returns a list of dictionaires with the main topics
    """
    ynet_url = 'https://ynet.co.il/home/0,7340,L-8,00.html'
    response = simple_get(ynet_url)

    if response is not None:
        soup = BeautifulSoup(response, 'html.parser')
        titles = []
        titles_squares = soup.find_all("div", class_="str3s_txt")
        for ts in titles_squares:
            titles.append({
                'title': ts.find("div", class_="title").text,
                'sub_title': ts.find("div", class_="sub_title").text
            })
        return titles

    # Raise an exception if we failed to get any data from the url
    raise Exception('Error retrieving contents at {}'.format(ynet_url))

print(get_ynet_data())