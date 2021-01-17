from datasets import boots, mythics, completed_items, champs, skills, aram_skills, keystones, runes
import random
from math import ceil
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import sys

def generate_builds(people, guild_id, aram=False):
    num_people = len(people)
    if num_people < 2:
        return

    xdim, ydim = 146, 438
    canvas = np.ones((xdim*(ceil(num_people/2)), ydim*2, 3))

    random_champ_ids = random.sample(champs, num_people)

    for pos in range(num_people):
        random_item_ids = [random.choice(boots), random.choice(mythics)] + random.sample(completed_items, 4)
        random_keystone_id = random.choice(keystones)
        primary_rune_id = random_keystone_id // 100
        random_secondary_rune_id = random.choice([rune for rune in runes if rune != primary_rune_id])

        if aram:
            random_summoner_ids = random.sample(aram_skills, 2)
        else:
            random_summoner_ids = random.sample(skills, 2)

        fig = plt.figure(constrained_layout=False)
        gs = fig.add_gridspec(7, 7)
        gs.update(wspace=-0.5, hspace=0.03)
        ax1 = fig.add_subplot(gs[:2, :2])
        ax1.set_title("{}".format(people[pos][:7]))
        ax1.imshow(plt.imread("./champs/{}.png".format(random_champ_ids[pos])))
        ax1.set_axis_off()
        ax2 = fig.add_subplot(gs[0, 3])
        ax2.set_axis_off()
        ax2.imshow(plt.imread("./skills/{}.png".format(random_summoner_ids[0])))
        ax3 = fig.add_subplot(gs[0, 4])
        ax3.set_axis_off()
        ax3.imshow(plt.imread("./boots/{}.png".format(random_item_ids[0])))
        ax4 = fig.add_subplot(gs[0, 5])
        ax4.set_axis_off()
        ax4.imshow(plt.imread("./mythics/{}.png".format(random_item_ids[1])))
        ax5 = fig.add_subplot(gs[0, 6])
        ax5.set_axis_off()
        ax5.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[2])))
        ax7 = fig.add_subplot(gs[1, 3])
        ax7.set_axis_off()
        ax7.imshow(plt.imread("./skills/{}.png".format(random_summoner_ids[1])))
        ax8 = fig.add_subplot(gs[1, 4])
        ax8.set_axis_off()
        ax8.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[3])))
        ax9 = fig.add_subplot(gs[1, 5])
        ax9.set_axis_off()
        ax9.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[4])))
        ax10 = fig.add_subplot(gs[1, 6])
        ax10.set_axis_off()
        ax10.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[5])))
        ax11 = fig.add_subplot(gs[0, 2])
        ax11.set_axis_off()
        ax11.imshow(plt.imread("./runes/{}.png".format(random_keystone_id)))
        ax12 = fig.add_subplot(gs[1, 2])
        ax12.set_axis_off()
        ax12.imshow(plt.imread("./runes/{}.png".format(random_secondary_rune_id)))
        plt.savefig("build{}.jpg".format(guild_id), bbox_inches="tight", pad_inches=0.1)
        plt.close(fig)

        col = 0
        if pos >= ceil(num_people / 2):
            col = 1

        canvas[((pos%(ceil(num_people/2)))*xdim):(((pos%(ceil(num_people/2)))+1)*xdim),(col*ydim):((col+1)*ydim),:] = plt.imread("./build{}.jpg".format(guild_id)) / 255.0

    plt.imsave("./result{}.jpg".format(guild_id), canvas)

def reroll_build(people, index, guild_id, aram=False):
    num_people = len(people)
    if num_people < 2:
        return

    xdim, ydim = 146, 438

    random_champ_id = random.choice(champs)
    random_item_ids = [random.choice(boots), random.choice(mythics)] + random.sample(completed_items, 4)
    random_keystone_id = random.choice(keystones)
    primary_rune_id = random_keystone_id // 100
    random_secondary_rune_id = random.choice([rune for rune in runes if rune != primary_rune_id])

    if aram:
        random_summoner_ids = random.sample(aram_skills, 2)
    else:
        random_summoner_ids = random.sample(skills, 2)

    fig = plt.figure(constrained_layout=False)
    gs = fig.add_gridspec(7, 7)
    gs.update(wspace=-0.5, hspace=0.03)
    ax1 = fig.add_subplot(gs[:2, :2])
    ax1.set_title("{}".format(people[index][:7]))
    ax1.imshow(plt.imread("./champs/{}.png".format(random_champ_id)))
    ax1.set_axis_off()
    ax2 = fig.add_subplot(gs[0, 3])
    ax2.set_axis_off()
    ax2.imshow(plt.imread("./skills/{}.png".format(random_summoner_ids[0])))
    ax3 = fig.add_subplot(gs[0, 4])
    ax3.set_axis_off()
    ax3.imshow(plt.imread("./boots/{}.png".format(random_item_ids[0])))
    ax4 = fig.add_subplot(gs[0, 5])
    ax4.set_axis_off()
    ax4.imshow(plt.imread("./mythics/{}.png".format(random_item_ids[1])))
    ax5 = fig.add_subplot(gs[0, 6])
    ax5.set_axis_off()
    ax5.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[2])))
    ax7 = fig.add_subplot(gs[1, 3])
    ax7.set_axis_off()
    ax7.imshow(plt.imread("./skills/{}.png".format(random_summoner_ids[1])))
    ax8 = fig.add_subplot(gs[1, 4])
    ax8.set_axis_off()
    ax8.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[3])))
    ax9 = fig.add_subplot(gs[1, 5])
    ax9.set_axis_off()
    ax9.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[4])))
    ax10 = fig.add_subplot(gs[1, 6])
    ax10.set_axis_off()
    ax10.imshow(plt.imread("./completed_items/{}.png".format(random_item_ids[5])))
    ax11 = fig.add_subplot(gs[0, 2])
    ax11.set_axis_off()
    ax11.imshow(plt.imread("./runes/{}.png".format(random_keystone_id)))
    ax12 = fig.add_subplot(gs[1, 2])
    ax12.set_axis_off()
    ax12.imshow(plt.imread("./runes/{}.png".format(random_secondary_rune_id)))
    plt.savefig("build{}.jpg".format(guild_id), bbox_inches="tight", pad_inches=0.1)
    plt.close(fig)

    col = 0
    if index >= ceil(num_people / 2):
        col = 1

    canvas = plt.imread("./result{}.jpg".format(guild_id)) / 255.0
    canvas[((index%(ceil(num_people/2)))*xdim):(((index%(ceil(num_people/2)))+1)*xdim),(col*ydim):((col+1)*ydim),:] = plt.imread("./build{}.jpg".format(guild_id)) / 255.0

    plt.imsave("./result{}.jpg".format(guild_id), canvas)

if __name__ == "__main__":
    # Retrieve arguments from command line
    people, aram_bool, reroll_bool, guild_id = sys.argv[1].split(" "), sys.argv[2] == "true", sys.argv[3] == "true", sys.argv[5]
    if reroll_bool:
        index = int(sys.argv[4])
        reroll_build(people, index, guild_id, aram_bool)
    else:
        generate_builds(people, guild_id, aram_bool)