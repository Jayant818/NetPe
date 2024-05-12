## To use this we have to first pull it and place it in the root then create a image of this then push the image and we have to do the same for all 3 apps, but there are ways to do all 3 at once

# jayada bada version nhi hai node ka chota hi hai
FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

# Turbo mai kya hota hai ki depenedency array bahar hoti hai orr under bhi hoti hai inside app & packages
# So Before running npm install we have to import all
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?
RUN npm run db:generate

# Can you filter the build down to just one app?
RUN npm run build

CMD ["npm", "run", "start-user-app"]