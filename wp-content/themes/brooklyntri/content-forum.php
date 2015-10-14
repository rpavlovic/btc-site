<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$infobox = get_fields( get_the_ID() );

$forum = get_forum_id_by_url();

?>
				<section class="forum-area">
					<header>
						<?php the_title('<h1>','</h1>'); ?>
						<?= $forum == 'forum' ? $infobox['intro'] : '' ?>
					</header>

					<div class="divider">
						<div class="holder"></div>
					</div>
					<?php //echo the_content(); ?>
					<form action="#" class="search-form">
						<fieldset>
							<legend class="hidden">search form</legend>
							<input class="button" type="submit" value="SEARCH">
							<div class="input-holder">
								<label for="search" class="hidden">search</label>
								<input class="search" type="search" id="search">
							</div>
						</fieldset>
					</form>


			        <div class="forum-table">

<?php if ($forum['type'] == 'index'): ?>
						<table>
							<caption class="hidden">this is forum table</caption>
							<thead>
								<tr>
									<th class="col1">Forum</th>
									<th class="col2">Topics</th>
									<th class="last">Posts</th>
								</tr>
							</thead>
							<tbody>
<?php
$forums = get_all_forums();
foreach ( $forums as $f ):
	$rel = get_post_topic_counts($f->forum_id);
?>
								<tr>
									<td class="col1">
										<h2><a href="<?= esc_url( get_permalink( $post->ID ) . '/' . $f->forum_slug ); ?>"><?= esc_html( $f->forum_name ) ?></a></h2>
										<p><?= esc_html( $f->forum_desc ) ?></p>
									</td>
									<td class="col2"><span><?= $rel['topics'] ? $rel['topics'] : 0 ?></span></td>
									<td class="last"><em><?= $rel['posts'] ? $rel['posts'] : 0 ?></em></td>
								</tr>
<?php endforeach; ?>
							</tbody>
						</table>

<?php elseif ($forum['type'] == 'forum'): ?>
						<table>
							<caption class="hidden">this is forum table</caption>
							<thead>
								<tr>
									<th class="col1">Post</th>
									<th class="col2">Read</th>
									<th class="last">Posts</th>
								</tr>
							</thead>
							<tbody>
<?php
foreach ( $forum as $f ):
	$topics = get_topic_by_forum($f->forum_id);
	foreach ( $topics as $topic ):
?>
								<tr>
									<td class="col1">
										<h2><a href="<?= esc_url( get_permalink( $post->ID ) . '/' . $topic->topic_slug ); ?>"><?= esc_html( $topic->topic_name ) ?></a></h2>
										<p>Posted on <?= date("m/d/Y", strtotime($topic->topic_date))?></p>
									</td>
									<td class="col2"><span><?= $topic->topic_opened ?></span></td>
									<td class="last"><em><?= $topic->post_count ?></em></td>
								</tr>
<?php endforeach; endforeach; ?>
							</tbody>
						</table>

<?php

// thread:
else: 
	$forum_posts = get_posts_by_topic($forum['slug']);
	foreach( $forum_posts as $msg ):
?>
						<p>
							<?= nl2br(strip_tags($msg->post_content, "<p><a><blockquote>")) ?>
						</p>

<?php endforeach; ?>

<?php endif; ?>

			        </div>

				</section>